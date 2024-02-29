import sys
from PIL import Image, ImageSequence

def decode_gif(filename):
    with Image.open(filename) as img:
        frames = [frame.copy() for frame in ImageSequence.Iterator(img)]
    
    binary_string = ""
    
    for frame in frames:
        gray_frame = frame.convert("L")
        avg_pixel_value = sum(gray_frame.getdata()) / len(gray_frame.getdata())
        threshold = 128 
        binary_string += "0" if avg_pixel_value < threshold else "1"
    
    return binary_string

def main():
    if len(sys.argv) != 2:
        print("Use: python decode_gif.py <file_path>")
        sys.exit(1)
    
    filename = sys.argv[1]
    binary_string = decode_gif(filename)
    text = ""
    for i in range(0, len(binary_string), 8):
        byte = binary_string[i:i+8]
        decimal = int(byte, 2)
        character = chr(decimal)
        text += character

    print(f"Offer: {text}")
if __name__ == "__main__":
    main()
