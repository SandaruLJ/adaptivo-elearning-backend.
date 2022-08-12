import json
import sys


def get_concept(id, concepts):
    for concept in concepts:
        if concept['_id'] == id:
            return concept


def generate_concept_path(target_concept, concepts, concept_path = []):
    concept_path.insert(0, target_concept)
    prerequisites = target_concept['preRequisites']
    if prerequisites:
        for prerequisite in reversed(prerequisites):
            prerequisite_concept = get_concept(prerequisite, concepts)
            generate_concept_path(prerequisite_concept, concepts, concept_path)
    return concept_path


def adjust_concept_path_to_knowledge(concept_path, knowledge):
    for concept in concept_path[::]:
        for learned_concept in knowledge['concepts']:
            if concept['_id'] == learned_concept['conceptId']:
                if learned_concept['knowledge'] == 100:
                    concept_path.remove(concept)
                else:
                    for lo in learned_concept['learningObjects']:
                        concept['learningObjects'].remove(lo)
    return concept_path


def determine_learning_resource_type(learning_style):
    input = learning_style['input']
    if input == 'visual':
        return 'video'
    elif input == 'verbal':
        return 'audio'
    else:
        return 'text'


def select_learning_resources(concept_path, learning_resources, lr_type):
    for concept in concept_path:
        for index, lo in enumerate(concept['learningObjects']):
            for lr in learning_resources:
                if lo == lr['loId'] and lr['type'] == lr_type:
                    concept['learningObjects'][index] = {
                        'learningObject': lo,
                        'learningResource': lr['_id']
                    }
    return concept_path


if __name__ == '__main__':
    concepts = json.loads(sys.argv[1])
    learning_resources = json.loads(sys.argv[2])
    knowledge = json.loads(sys.argv[3])
    learning_style = json.loads(sys.argv[4])
    target = sys.argv[5]

    # Get target concept
    target_concept = get_concept(target, concepts)

    # Generate concept path
    concept_path = generate_concept_path(target_concept, concepts)

    # Adjust concept path to existing knowledge
    concept_path = adjust_concept_path_to_knowledge(concept_path, knowledge)

    # Determine learning resource type according to learning style
    lr_type = determine_learning_resource_type(learning_style)

    # Select learning resources and create learning path
    learning_path = select_learning_resources(concept_path, learning_resources, lr_type)

    # for index, concept in enumerate(learning_path):
    #     print(f"({concept['_id']}, {concept['learningObjects']})", end="")
    #     if index != len(concept_path) - 1:
    #         print(" -> ", end="")
    #     else:
    #         print("")

    print(json.dumps(learning_path))
