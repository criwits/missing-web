static int hex2dec(char c)
{
  if ('0' <= c && c <= '9')
  {
    return c - '0';
  }
  else if ('a' <= c && c <= 'f')
  {
    return c - 'a' + 10;
  }
  else if ('A' <= c && c <= 'F')
  {
    return c - 'A' + 10;
  }
  else
  {
    return -1;
  }
}

static char dec2hex(short int c) {
  if (0 <= c && c <= 9) {
    return c + '0';
  }
  else if (10 <= c && c <= 15) {
    return c + 'A' - 10;
  }
  else {
    return -1;
  }
}

void urlencode(char *dst, const char *src) {
  char *src_i = (char *)src;
  while ('\0' != *src_i) {
    if ('0' <= *src_i && *src_i <= '9' ||
        'a' <= *src_i && *src_i <= 'z' ||
        'A' <= *src_i && *src_i <= 'Z' ||
        '/' == *src_i || *src_i == '.' ||
        '(' == *src_i || *src_i == ')' ) {
      *dst++ = *src_i++;
    }
    else {
      int j = (short int) *src_i++;
      if (j < 0) { j += 256; }
      int i1 = j / 16, i0 = j - i1 * 16;
      *dst++ = '%';
      *dst++ = dec2hex(i1);
      *dst++ = dec2hex(i0);
    }
  }
  *dst = '\0';
}