# AgentBar icon: a G.O.A.T. in sunglasses.
from PIL import Image, ImageDraw

S = 1024
INK = (30, 30, 36, 255)
FUR = (246, 241, 232, 255)
FUR_SHADE = (222, 214, 200, 255)
HORN = (201, 160, 102, 255)
EAR_IN = (240, 170, 170, 255)
SNOUT = (228, 216, 200, 255)
GOLD = (250, 204, 21, 255)
W = 30

def layer():
    return Image.new("RGBA", (S, S), (0, 0, 0, 0))

img = layer()

d = ImageDraw.Draw(img)
# horns: curved strokes growing out of the top of the head
for flip in (1, -1):
    pts = [(512 + flip * x, y) for x, y in [(95, 330), (120, 230), (160, 150), (225, 95), (290, 80)]]
    d.line(pts, fill=INK, width=120, joint="curve")
    d.line(pts, fill=HORN, width=72, joint="curve")
    tip = pts[-1]
    d.ellipse([tip[0] - 60, tip[1] - 60, tip[0] + 60, tip[1] + 60], fill=INK)
    d.ellipse([tip[0] - 36, tip[1] - 36, tip[0] + 36, tip[1] + 36], fill=HORN)

# ears: rotated ellipses
for flip in (1, -1):
    ear = layer()
    e = ImageDraw.Draw(ear)
    e.ellipse([512 - 190, 512 - 70, 512 + 190, 512 + 70], fill=FUR, outline=INK, width=W)
    e.ellipse([512 - 120, 512 - 30, 512 + 110, 512 + 30], fill=EAR_IN)
    ear = ear.rotate(flip * -20, center=(512, 512))
    img.alpha_composite(ear, (flip * 300, -110))

d = ImageDraw.Draw(img)
# beard (behind head)
d.polygon([(440, 820), (584, 820), (512, 1015)], fill=FUR_SHADE)
d.line([(440, 820), (512, 1015), (584, 820)], fill=INK, width=W, joint="curve")

# head
d.rounded_rectangle([290, 250, 734, 860], radius=210, fill=FUR, outline=INK, width=W)
# muzzle
d.rounded_rectangle([392, 640, 632, 845], radius=100, fill=SNOUT, outline=INK, width=W)
d.ellipse([452, 705, 486, 735], fill=INK)
d.ellipse([538, 705, 572, 735], fill=INK)
d.arc([462, 735, 562, 800], 25, 155, fill=INK, width=16)  # smug smile

# sunglasses
d.line([(300, 470), (724, 470)], fill=INK, width=34)
for x0 in (318, 530):
    d.rounded_rectangle([x0, 430, x0 + 176, 560], radius=48, fill=INK)
    d.line([(x0 + 40, 462), (x0 + 80, 462)], fill=(255, 255, 255, 200), width=16)  # shine

sizes = [16, 20, 24, 32, 40, 48, 64, 128, 256]
img.save("../src/AgentBar.ico", sizes=[(s, s) for s in sizes])
img.resize((256, 256), Image.LANCZOS).save("../docs/icon.png")
dark = Image.new("RGBA", (200, 56), (28, 28, 28, 255))
for x, s in zip((8, 36, 76, 124), (16, 24, 32, 48)):
    dark.alpha_composite(img.resize((s, s), Image.LANCZOS), (x, (56 - s) // 2))
dark.resize((600, 168), Image.NEAREST).save("goat-small-on-dark.png")  # local preview only
print("ok")
