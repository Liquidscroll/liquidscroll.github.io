---
title: "Developing a Feline-Playing Robot Using Vision-Based Object Detection"
date: 2023-03-03
layout: layouts/post.njk
permalink: "/posts/mbot-comp-vision/"
tags:
  - post
  - project
---

As part of a Robotics class at Deakin University, I undertook a project to develop a robot that could autonomously play with my cats, using vision-based object detection. In this project, I aimed to use a pre-trained object detection model from the Python library Tensorflow to enable the robot to detect and interact with a ball, and then launch it for my cats to play with.

To accomplish this, I used an MBot Ranger, an Arduino-based robotics platform, and a regular home webcam. The images from the webcam were fed into the Tensorflow object detection pipeline, and the screen coordinates of detected objects were filtered to identify the target object, which was a ball. The coordinates were then fed back into the logic of the robot, which moved itself to keep on target before charging forward to launch the ball for my cats.

While the system could detect and respond appropriately to the ball's location, it was at times temperamental. To improve its accuracy, I needed to create and train a custom object detection model to specify my targets more accurately.

Despite these difficulties, the project was a success. It provided me with valuable insights into the potential of robotics and AI in pet interaction. Watching the robot track and launch the ball for my cats was an unforgettable experience. The experiment was more than just a robot playing with cats; it was a connection between technology and pets. As I reflect on this project, I realize that the possibilities for pet interaction through robotics and AI are endless. With continued advancements in technology, there is a bright future ahead for safe, interactive play between pets and robots.
