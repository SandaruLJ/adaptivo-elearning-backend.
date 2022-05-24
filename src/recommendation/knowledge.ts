let knowledge = {
        _id: "1",
        userId: "1",
        concepts: [
            {
                conceptId: "1",
                knowledge: 100,
                learningObjects: [
                    "1",
                    "2",
                    "3"
                ]
            },
            {
                conceptId: "2",
                knowledge: 80,
                learningObjects: [
                    "4",
                    "5"
                ]
            }
        ],
        lessons: [
            {
                lessonId: "1",
                knowledge: 70
            },
            {
                lessonId: "2",
                knowledge: 60
            }
        ]
    };

export let getKnowledge = () => new Promise(resolve => resolve(knowledge));
