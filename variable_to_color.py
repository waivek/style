import webcolors

def color_to_rgb(color, temperature):
    kelvin_table = {
        "1000": (255 ,  56 ,   0), "1500": (255 , 109 ,   0),  "2000": (255 , 137 ,  18), "2500": (255 , 161 ,  72),
        "3000": (255 , 180 , 107), "3500": (255 , 196 , 137),  "4000": (255 , 209 , 163), "4500": (255 , 219 , 186),
        "5000": (255 , 228 , 206), "5500": (255 , 236 , 224),  "6000": (255 , 243 , 239), "6500": (255 , 255,  255),
        "7000": (245 , 243 , 255), "7500": (235 , 238 , 255),  "8000": (227 , 233 , 255), "8500": (220 , 229 , 255),
        "9000": (214 , 225 , 255), "9500": (208 , 222 , 255), "10000": (204 , 219 , 255)
    }
    if color[0] == "#":
        w = webcolors.hex_to_rgb(color)
    elif color[0:3] == "rgb":
        t = eval(color[3:])
        w = webcolors.IntegerRGB(*t)
    else:
        w = webcolors.name_to_rgb(color)
    r, g, b = kelvin_table[temperature]
    r_init, g_init, b_init = w
    r_final = (r / 255) * r_init
    g_final = (g / 255) * g_init
    b_final = (b / 255) * b_init
    rgb_temperate_color_string = "rgb(%d, %d, %d);" % (r_final, g_final, b_final)
    return rgb_temperate_color_string

temperatures = [i for i in range(1000, 6500+1, 500)]

variables = {}
variables["light"] = { 
    "content_background": "white",
    "reader_background": "#efebeb",
    "text_color": "black",
    "path_color": "#ccc",
    "link_color": "#36c"
}
variables["sepia"] = {
    "content_background": "cornsilk",
    "reader_background": "#ffe8ca",
    "text_color": "black",
    "path_color": "#b9ae80",
    "link_color": "#5a83d3"
}
variables["dark"] = {
    "content_background": "#444",
    "reader_background": "rgb(82, 86, 89)",
    "text_color": "#eaeaea",
    "path_color": "#838383",
    "link_color": "#67c6d5"
}

themes = list(variables.keys())

rules = {
    "body"                     : { "color"      : "text_color", "background" : "content_background" },
    "body > #content"          : { "background" : "content_background" },
    "body.reader"              : { "background" : "reader_background" },
    "body a"                   : { "color"      : "link_color" },
    "body .path a, body .path" : { "color"      : "path_color" },
    "body .path a:hover"       : { "color"      : "text_color" }
}
for temperature in temperatures:
    temperature_string = "temperature_%d" % temperature
    for theme in themes:
        for selector, rule_dict in rules.items():


            new_selector = selector.replace("body", "body.%s.%s" % (theme, temperature_string))
            print("%s {" % new_selector)
            for prop, variable in rule_dict.items():
                color_value = variables[theme][variable]
                rgb_temperate_color_value = color_to_rgb(color_value, str(temperature))
                print("    %s: %s" % (prop, rgb_temperate_color_value))
            print("}")
            print()
