import webcolors
# original: "6500": (255 , 249 , 253)
# modified: "6500": (255 , 255,  255)
kelvin_table = {
    "1000": (255 ,  56 ,   0), "1500": (255 , 109 ,   0),  "2000": (255 , 137 ,  18), "2500": (255 , 161 ,  72),
    "3000": (255 , 180 , 107), "3500": (255 , 196 , 137),  "4000": (255 , 209 , 163), "4500": (255 , 219 , 186),
    "5000": (255 , 228 , 206), "5500": (255 , 236 , 224),  "6000": (255 , 243 , 239), "6500": (255 , 255,  255),
    "7000": (245 , 243 , 255), "7500": (235 , 238 , 255),  "8000": (227 , 233 , 255), "8500": (220 , 229 , 255),
    "9000": (214 , 225 , 255), "9500": (208 , 222 , 255), "10000": (204 , 219 , 255)
}
css_string = """
body.light {
    --content_background: white;
    --reader_background: #efebeb;
    --text_color: black;
    --path_color: #ccc;
    --link_color: #36c;
}
body.sepia {
    --content_background: cornsilk;
    --reader_background: #ffe8ca;
    --text_color: black;
    --path_color: #b9ae80;
    --link_color: #5a83d3;
}
body.dark {
    --content_background: #444;
    --reader_background: rgb(82, 86, 89);
    --text_color: #eaeaea;
    --path_color: #838383;
    --link_color: #67c6d5;
}
"""
temperatures = [int(key) for key in kelvin_table.keys() if int(key) <= 6500 and int(key) >= 2000]
temperatures.sort()
for temperature in temperatures:
    temperature = str(temperature)
    for line in css_string.split("\n"):
        if line[0:4] == "body":
            print(line.replace("body", "body.temperature_%s" % temperature))
        elif line.strip() == "}":
            print(line)
        elif line.strip()[0:2] == "--":
            variable_name , color = line.split(":")
            color = color.strip();
            color, _ = color.split(";")
            color = color.strip()

            if color[0] == "#":
                w = webcolors.hex_to_rgb(color)
            elif color[0:3] == "rgb":
                t = eval(color[3:])
                w = webcolors.IntegerRGB(*t)
            else:
                w = webcolors.name_to_rgb(color)
            # print("  " + str(w))

            r, g, b = kelvin_table[temperature]
            r_init, g_init, b_init = w

            r_final = (r / 255) * r_init
            g_final = (g / 255) * g_init
            b_final = (b / 255) * b_init

            print("%s: rgb(%d, %d, %d);" % (variable_name, r_final, g_final, b_final))
