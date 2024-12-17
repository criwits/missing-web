non_print = [
    "NUL", "SOH", "STX", "ETX", "EOT", "ENQ", "ACK", "BEL",
    "BS", "HT", "LF", "VT", "FF", "CR", "SO", "SI",
    "DLE", "DC1", "DC2", "DC3", "DC4", "NAK", "SYN", "ETB",
    "CAN", "EM", "SUB", "ESC", "FS", "GS", "RS", "US",
]
for i in range(0, 16):
    print("|**`{x}`**|".format(x=i), end="")
    for j in range(0, 8):
        code = j * 16 + i
        if code < 32:
            char = non_print[code]
        else:
            char = f"`{chr(code)}`"
        print("{char}|".format(char=char), end="")
    print()

