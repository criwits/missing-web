#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fcntl.h>
#include <unistd.h>
#include <dirent.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <errno.h>
#include "cJSON.h"

void urlencode(char *dst, const char *src);

int runcmd(const char *cmd) {
  pid_t status;
  status = system(cmd);
  if (-1 == status || !WIFEXITED(status)) return -1;
  else return WEXITSTATUS(status);
}

int unzip(const char * input_filename, const char * output_dirname) {
  char cmdbuf[1024];
  sprintf(cmdbuf, "7za x -tzip -y %s -o\"%s\" > /dev/null 2>&1", input_filename, output_dirname);
  return runcmd(cmdbuf);
}

int mv(const char *src, const char *dst) {
  char cmdbuf[1024];
  sprintf(cmdbuf, "mv -f \"%s\" \"%s\" > /dev/null 2>&1", src, dst);
  return runcmd(cmdbuf);
}

int mvf(const char *src, const char *dst) {
  char cmdbuf[1024];
  sprintf(cmdbuf, "mv -f \"%s.md\" \"%s.md\" > /dev/null 2>&1", src, dst);
  return runcmd(cmdbuf);
}

int sed(const char *ori, const char *new, const char *file) {
  char cmdbuf[1024];
  sprintf(cmdbuf, "sed -i \'s/%s/%s/g\' \"%s\"", ori, new, file);
  return runcmd(cmdbuf);
}

typedef struct cfg {
  char *zipfile;
  char *outdir;
  int page_count;

  struct page {
    char *shorttitle;
    char *notion;
  } main_page;
  
  struct page page[64];
  
} cfg_t;

cfg_t config;

int lookup(const char *s) {
  if (0 == strcmp(s, config.main_page.notion)) {
    return -2;
  }
  for (int i = 0; i < config.page_count; i++) {
    if (0 == strcmp(s, config.page[i].notion)) {
      return i;
    }
  }
  return -1;
}


void scan_dir(const char *dir) {
  DIR *dp;
  struct dirent *entry;
  struct stat statbuf; 
  if ((NULL == (dp = opendir(dir)))) {
    printf("Failed!\n");
    printf("E: Cannot open directory %s: %s\n", dir, strerror(errno));
    exit(4);
  }
  chdir(dir);
  while (NULL != (entry = readdir(dp))) {
    lstat(entry->d_name, &statbuf);
    if (S_ISDIR(statbuf.st_mode)) {
      if (0 == strcmp(".", entry->d_name) || 0 == strcmp("..", entry->d_name)) {
        continue;
      }
      scan_dir(entry->d_name);
      int index = lookup(entry->d_name);
      if (-1 != index) {
        if (-2 == index) {
          if (0 != mv(entry->d_name, config.main_page.shorttitle)) {
            printf("Failed!\n");
            printf("E: Cannot rename directory %s!\n", entry->d_name);
            exit(4);
          }
        }
        else {
          if (0 != mv(entry->d_name, config.page[index].shorttitle)) {
            printf("Failed!\n");
            printf("E: Cannot rename directory %s!\n", entry->d_name);
            exit(4);
          }
        }
      }
    }
    else {

      do {
        char buf[1024];
        memset(buf, 0, 1024);
        urlencode(buf, config.main_page.notion);
        sed(buf, config.main_page.shorttitle, entry->d_name);
      } while (0);

      for (int i = 0; i < config.page_count; i++) {
        char buf[1024];
        memset(buf, 0, 1024);
        urlencode(buf, config.page[i].notion);
        sed(buf, config.page[i].shorttitle, entry->d_name);
      }

      int len = strlen(entry->d_name);
      if (len >= 4) {
        char buf[256];
        memset(buf, 0, 256);
        strncpy(buf, entry->d_name, len - 3);
        int index = lookup(buf);
        if (-1 != index) {
          if (-2 == index) {
            if (0 != mvf(buf, "README.md")) {
              printf("Failed!\n");
              printf("E: Cannot rename file %s!\n", entry->d_name);
              exit(4);
            }
          }
          else {
            if (0 != mvf(buf, config.page[index].shorttitle)) {
              printf("Failed!\n");
              printf("E: Cannot rename file %s!\n", entry->d_name);
              exit(4);
            }     
          }
        }
      }


    }

  }
  chdir("..");
  closedir(dp);
}

int main(int argc, const char * argv[]) {
  char cfgfilename[256];
  printf("ntd - A helper converting Notion markdown(s) into Docsify markdown(s).\n"
         "(C) Hans Wan. Licensed under MIT License.\n");
  if (argc != 2) {
    printf("Usage: %s CONFIG_FILE\n", argv[0]);
    exit(-1);
  }
  else {
    strncpy(cfgfilename, argv[1], 256);
  }
  printf(" - Opening configuration file `%s`... ", cfgfilename);

  FILE *cfgfile = NULL;
  if (NULL == (cfgfile = fopen(cfgfilename, "rb"))) {
    printf("Failed!\n");
    printf("E: Cannot open configuration file `%s`: %s\n", cfgfilename, strerror(errno));
    exit(1);
  }
  int cfglen = 0;
  if (0 != fseek(cfgfile, 0, SEEK_END) || 0 == (cfglen = ftell(cfgfile)) || 0 != fseek(cfgfile, 0, SEEK_SET)) {
    printf("Failed!\n");
    printf("E: Configuration file might be broken!\n");
    exit(1);
  }
  char *cfgdata;
  if (NULL == (cfgdata = (char *)malloc(cfglen + 1)) || cfglen != fread(cfgdata, 1, cfglen, cfgfile)) {
    printf("Failed!");
    printf("E: Error(s) occurred while reading configuration file!\n");
    exit(1);
  }

  fclose(cfgfile);
  printf("Success!\n");

  printf(" - Reading configurations... ");
  cJSON *root;
  if (NULL == (root = cJSON_Parse(cfgdata))) {
    printf("Failed!\n");
    printf("E: Cannot parse the configuration file!\n");
    exit(2);
  }

  const char cfgstrs[][16] = {
    "zipfile", "outdir", "main_page", "pages"
  };

  cJSON *cfg_items[4];
  for (int i = 0; i < 4; i++) {
    if (NULL == (cfg_items[i] = cJSON_GetObjectItem(root, cfgstrs[i]))) {
      printf("Failed!\n");
      printf("E: Error(s) occurred while reading parameter `%s`!\n", cfgstrs[i]);
      exit(2);
    }
  }

  config.zipfile = cJSON_Print(cfg_items[0]);
  config.outdir = cJSON_Print(cfg_items[1]);
  config.page_count = cJSON_GetArraySize(cfg_items[3]);

  do {
    cJSON *shorttitlenode, *notionnode;
    if (NULL == (shorttitlenode = cJSON_GetObjectItem(cfg_items[2], "short")) || NULL == (notionnode = cJSON_GetObjectItem(cfg_items[2], "notion"))) {
      printf("Failed!\n");
      printf("E: Error(s) occurred while reading the main page information!");
      exit(2);
    }
    config.main_page.shorttitle = cJSON_Print(shorttitlenode);
    config.main_page.notion = cJSON_Print(notionnode);
  } while (0);

  for (int i = 0; i < config.page_count; i++) {
    cJSON *pagenode = cJSON_GetArrayItem(cfg_items[3], i);
    cJSON *shorttitlenode, *notionnode;
    if (NULL == (shorttitlenode = cJSON_GetObjectItem(pagenode, "short")) || NULL == (notionnode = cJSON_GetObjectItem(pagenode, "notion"))) {
      printf("Failed!\n");
      printf("E: Error(s) occurred while reading the page infomation with index %d!\n", i);
      exit(2);
    }
    config.page[i].shorttitle = cJSON_Print(shorttitlenode);
    config.page[i].notion = cJSON_Print(notionnode);
  }

  cJSON_Delete(root);
  free(cfgdata);

  config.outdir[strlen(config.outdir) - 1] = '\0';
  config.outdir++;

  config.main_page.notion[strlen(config.main_page.notion) - 1] = '\0';
  config.main_page.shorttitle[strlen(config.main_page.shorttitle) - 1] = '\0';
  config.main_page.notion++;
  config.main_page.shorttitle++;

  for (int i = 0; i < config.page_count; i++) {
    config.page[i].notion[strlen(config.page[i].notion) - 1] = '\0';
    config.page[i].shorttitle[strlen(config.page[i].shorttitle) - 1] = '\0';
    config.page[i].notion++;
    config.page[i].shorttitle++;
  }

  printf("Success!\n");
  printf("  -- Notion ZIP file: %s\n"
         "  -- Output directory: %s\n"
         "  -- Notion title: %s\n"
         "  -- Pages count: %d\n", config.zipfile, config.outdir, config.main_page.notion, config.page_count);

  printf(" - Extracting Notion ZIP file... ");
  if (0 != unzip(config.zipfile, config.outdir)) {
    printf("Failed!\n");
    printf("E: Error(s) occurred while extracting Notion ZIP file!\n");
    exit(3);
  }
  printf("Success!\n");


  printf(" - Remapping filenames... ");
  scan_dir(config.outdir);
  printf("Success!\n");

  return 0;

}