import json
import sys
import random


def get_concept(id, concepts):
    for concept in concepts:
        if concept['_id'] == id:
            return concept
    return None


def get_learning_object(id, learning_objects):
    for learning_object in learning_objects:
        if learning_object['_id'] == id:
            return learning_object
    return None


def get_quiz(id, quizzes):
    for quiz in quizzes:
        if quiz['_id'] == id:
            return quiz
    return None


def check_prerequisite(id, concepts):
    prerequisites = concepts[preRequisites] 
    if concepts['_id'] == id:
        if len(prerequisites) > 1:
            for prerequisites in prerequisites:
                return prerequisites    
    

def check_initial_knowledge(answer): # Ask 'I have never heard' type questions
    answer = quizzes['answers']

    if answer == 1:
        check_prerequisite(id, concepts)
    else:
        go_to_LO(answer)
        # for lo in los:
        #     return lo


def go_to_LO(answer):

    los = concepts[learningobjects]
    for lo in los:
            return lo


def check_knowledge(correctAnswers): # From the questions of LOs
    correctAnswers = quizzes['correctAnswer']
    noOfQuestions = sum(learningobjects['quiz'])

    if sum((correctAnswers) / noOfQuestions) * 100 > 50:
        return 'pass' 
    else:
        return 'fail'


concepts = json.loads(sys.argv[1])          # concepts.json
learning_objects = json.loads(sys.argv[2])  # learning_objects.json
quizzes = json.loads(sys.argv[3])           # quizzes.json
target = sys.argv[4]                        # e.g. 4
prev_concept_id = sys.argv[5]               # e.g. 4
prev_learning_object_id = sys.argv[6]       # e.g. 12
answer_correct = bool(int(sys.argv[7]))     # e.g. 1 for correct, 0 for incorrect

first_quiz = True if prev_concept_id == '0' else False

if first_quiz:
    target_concept = get_concept(target, concepts)
    
    target_lo_id = target_concept['learningObjects'][0]
    target_learning_object = get_learning_object(target_lo_id, learning_objects)
    
    quiz_id = random.choice(target_learning_object['quiz'])
    quiz = get_quiz(quiz_id, quizzes)
    
    print(json.dumps(quiz))
else:
    prev_concept = get_concept(prev_concept_id, concepts)

    if answer_correct:
        lo_index = prev_concept['learningObjects'].index(prev_learning_object_id)

        if lo_index + 1 < len(prev_concept['learningObjects']):
            next_learning_object = get_learning_object(prev_concept['learningObjects'][lo_index + 1], learning_objects)
            next_quiz_id = random.choice(next_learning_object['quiz'])
            next_quiz = get_quiz(next_quiz_id, quizzes)

            print(json.dumps(next_quiz))
        else:
            print('Quiz Done!')
            status = "pass"
    else:
        if not prev_concept['preRequisites']:
            status = "fail"
            print('Failed!')
            sys.exit(0)

        prerequisite_id = random.choice(prev_concept['preRequisites'])
        prerequisite = get_concept(prerequisite_id, concepts)
        
        learning_object_id = prerequisite['learningObjects'][0]
        learning_object = get_learning_object(learning_object_id, learning_objects)

        next_quiz_id = random.choice(learning_object['quiz'])
        next_quiz = get_quiz(next_quiz_id, quizzes)
        print(json.dumps(next_quiz))
