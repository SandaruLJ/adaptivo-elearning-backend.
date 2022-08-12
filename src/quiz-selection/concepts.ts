let concepts = [
  {
    "_id": "1",
    "instructor_id": "1",
    "title": "Mass",
    "learningObjects": [
      "1",
      "2",
      "3"
    ],
    "preRequisites": []
  },
  {
    "_id": "2",
    "instructor_id": "1",
    "title": "Acceleration",
    "learningObjects": [
      "4",
      "5",
      "6",
      "7"
    ],
    "preRequisites": []
  },
  {
    "_id": "3",
    "instructor_id": "1",
    "title": "Force",
    "learningObjects": [
      "8",
      "9",
      "10",
      "11"
    ],
    "preRequisites": [
      "1",
      "2"
    ]
  },
  {
    "_id": "4",
    "instructor_id": "1",
    "title": "Newtons First Law of Motion",
    "learningObjects": [
      "12",
      "13",
      "14"
    ],
    "preRequisites": [
      "3"
    ]
  }
]

export let getConcepts = () => new Promise(resolve => resolve(concepts));

