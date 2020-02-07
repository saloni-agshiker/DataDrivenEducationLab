# Notes on Predicting Instructor’s Intervention in MOOC forums

This is an interesting idea, but flawed. We've decided to not attempt this method, but may use some of the engineered features in the application.

For the prediction:
* The model's prediction's are usually incorrect with an F1 score that maxes out at 0.3 in the best case.
* Whether or not an instructor replies to a forum thread is heavily dependent upon the instructor and the course, making any predictions outside of courses that have already been taught dubious.
* Since our app will be in Canvas, using Canvas data, we cannot train models from discussion forums with only a handful of students, and the instructors are most likely able to read most posts.
