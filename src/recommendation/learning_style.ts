let learning_style = {
        _id: "1",
        userId: "1",
        active: 0.5,
        reflective: 0.5,
        visual: 0.8,
        verbal: 0.2,
        sensing: 0.3,
        intuitive: 0.7,
        sequential: 0.9,
        global: 0.1,
        processing: 'balanced',
        input: 'visual',
        perception: 'intuitive',
        understanding: 'sequential'
    };

export let getLearningStyle = () => new Promise(resolve => resolve(learning_style));
