import json
import sys
from learning_path_generator import determine_learning_resource_type


def select_learning_resources(concepts, learning_resources, lr_type):
  recommendations = []
  
  for concept in concepts:
    for lo in concept['learningObjects']:
      for lr in learning_resources:
        if lo == lr['loId'] and lr['type'] == lr_type:
          recommendations.append(lr)

  return recommendations


if __name__ == '__main__':
  concepts = json.loads(sys.argv[1])
  learning_resources = json.loads(sys.argv[2])
  learning_style = json.loads(sys.argv[3])

  lr_type = determine_learning_resource_type(learning_style)

  recommendations = select_learning_resources(concepts, learning_resources, lr_type)

  print(json.dumps(recommendations))
