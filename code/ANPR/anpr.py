#Automatic License/Number Plate Recognition (ANPR) 

import pytesseract 
import cv2 
import numpy as np
import imutils

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  ###########

#License plate detection

img = cv2.imread('lp3.jpg',cv2.IMREAD_COLOR)	#Read image file ####################################
#Resize image as necessary --> especially for high res images
#Keeping the aspect ratio
scale_percent =  90     # percent of original size                                          #1
width = int(img.shape[1] * scale_percent / 100)
height = int(img.shape[0] * scale_percent / 100)
dim = (width, height)
img = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)	

#img = cv2.resize(img, (500,400), interpolation = cv2.INTER_AREA)	                        #2		

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 	#Convert to gray scale
#Removing noise by blurring  d-Filtersize (Use d=5 for real time applications)
#cv.bilateralFilter(src, d, sigmaColor, sigmaSpace[, dst[, borderType]]	) ->dst
gray = cv2.bilateralFilter(gray, 13, 15, 15)	
#gray = cv2.GaussianBlur(gray, (5, 5), 0)

#Canny Edge Detection
#cv2.Canny(image, threshold1, threshold2, apertureSize, L2gradient)
#threshold1: It is the High threshold value of intensity gradient.
#threshold2: It is the Low threshold value of intensity gradient.
#gradient intensity level is between 0 and 255 
edged = cv2.Canny(gray, 30, 200)

#Looking for contours in the image
#cv.findContours(image, mode, method[, contours[, hierarchy[, offset]]]	) ->image, contours, hierarchy
contours = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
contours = imutils.grab_contours(contours)				#Get the contours
#Sort the list of contours from big to small and take only the first 20 results
contours = sorted(contours, key = cv2.contourArea, reverse = True)[:20]	
screenCnt = None										#Initialize contour variable

#Loop through contour list to look for a rectangle shaped contour
for c in contours:
	#Contour perimeter - Second argument specifies whether shape is a closed contour (if passed True), or just a curve.
    peri = cv2.arcLength(c, True)
    #Second argument - maximum distance from contour to approximated contour. It is an accuracy parameter. - 1.8% of arc length
    #approxCurve = cv.approxPolyDP(curve, epsilon, closed[, approxCurve])
    approx = cv2.approxPolyDP(c, 0.018 * peri, True) ########################################
 	
 	# Check whether the approximated contour has four points
    if len(approx) == 4:
        screenCnt = approx
        break

#Check whether the appropriate contour was found
if screenCnt is None:
    detected = 0
    print ("No contour detected")
else:
     detected = 1

#If detected properly, draw a rectangle around it in red (B,G,R) in the resized image (img)
if detected == 1:
	#image = cv.drawContours(image, contours, contourIdx, color[, thickness[, lineType[, hierarchy[, maxLevel[, offset]]]]])
    cv2.drawContours(img, [screenCnt], -1, (0, 0, 255), 3)

    #Character segmentation

    #Masking the entire picture except for the place where the number plate is
    mask = np.zeros(gray.shape,np.uint8)
    new_image = cv2.drawContours(mask,[screenCnt],0,255,-1)
    new_image = cv2.bitwise_and(img,img,mask=mask)

    #Segment the license plate out of the image by cropping it and saving it as a new image
    #numpy.where() function returns the indices of elements in an input array where the given condition is satisfied.
    (x, y) = np.where(mask == 255)
    (topx, topy) = (np.min(x), np.min(y))
    (bottomx, bottomy) = (np.max(x), np.max(y))
    Cropped = gray[topx:bottomx+1, topy:bottomy+1]			#Crop the grayscale image


    #We can also gray it and edge it if required to improve the character recognition(For accuracy) ########################################
    Cropped = cv2.medianBlur(Cropped,3) # kernel size 3                                     #3
    #Cropped = cv2.Canny(Cropped, 30, 200)

    #Character recognition

    #Using pytesseract to read the characters
    #config - psm - Page segmentation modes - (https://stackoverflow.com/questions/44619077/pytesseract-ocr-multiple-config-options)
    #Use either 8 or ll for psm
    text = pytesseract.image_to_string(Cropped, config='--psm 11', lang="eng" )             #4
    print("Text:",text)

    #Remove unnecessary characters
    text = text[:-1]    #Removing last character
    num = ''.join(i.upper() for i in text if i.isalnum())   
    print("License Plate Number:",num)


    #For testing
    img = cv2.resize(img,(500,300)) #Image after masking
    Cropped = cv2.resize(Cropped,(400,200))
    cv2.imshow('car',img)
    cv2.imshow('Cropped',Cropped)

cv2.waitKey(0)
cv2.destroyAllWindows()



														








