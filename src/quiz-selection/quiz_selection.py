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


I_DONT_KNOW = "<p><span style=\"color: rgba(0,0,0,0.87);background-color: rgb(255,255,255);font-size: medium;font-family: Poppins, sans-serif;\">I don't know</span>&nbsp;</p>\n"


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
    
    target_learning_object = target_concept['learningObjects'][0]
    
    quiz = random.choice(target_learning_object['quiz'])
    
    # Append additional information
    quiz['concept'] = target_concept['_id']
    quiz['lo'] = target_learning_object['_id']
    quiz['answers'].append(I_DONT_KNOW)

    print(json.dumps(quiz))
else:
    prev_concept = get_concept(prev_concept_id, concepts)

    if answer_correct:
        # lo_index = prev_concept['learningObjects'].index(prev_learning_object_id)
        lo_index = 0
        for index, lo in enumerate(prev_concept['learningObjects']):
            if lo['_id'] == prev_learning_object_id:
                lo_index = index
                break
        else:
            sys.exit(0)

        if lo_index + 1 < len(prev_concept['learningObjects']):
            next_learning_object = prev_concept['learningObjects'][lo_index + 1]
            next_quiz = random.choice(next_learning_object['quiz'])

            # Append additional information
            next_quiz['concept'] = prev_concept['_id']
            next_quiz['lo'] = next_learning_object['_id']
            next_quiz['answers'].append(I_DONT_KNOW)
            
            print(json.dumps(next_quiz))
        else:
            print(json.dumps({ 'passed': True, 'msg': 'Quiz Done!' }))
            status = "pass"
    else:
        if not prev_concept['preRequisites']:
            status = "fail"
            print(json.dumps({ 'passed': False, 'msg': 'Failed!' }))
            sys.exit(0)

        prerequisite_id = random.choice(prev_concept['preRequisites'])
        prerequisite = get_concept(prerequisite_id, concepts)
        
        learning_object = prerequisite['learningObjects'][0]

        next_quiz = random.choice(learning_object['quiz'])

        # Append additional information
        next_quiz['concept'] = prerequisite['_id']
        next_quiz['lo'] = learning_object['_id']
        next_quiz['answers'].append(I_DONT_KNOW)

        print(json.dumps(next_quiz))
