import { CourseService } from "../services/CourseService.js";
import { LearningStyleService } from "../services/LearningStyleService.js";
import { LearningObjectService } from "../services/LearningObjectService.js";
import { randomUUID } from "crypto";
import { UserService } from "../services/UserService.js";

export const adaptUserCourse = async (userId: string, courseId: string) => {
  const course: any = await CourseService.getInstance().getCourseById(courseId);
  const learningStyle: any = await LearningStyleService.getInstance().getLearningStyleByUserId(userId);

  const originalCurriculum: any = course.curriculum;
  const adaptedCurriculum = [];

  await originalCurriculum.forEach((lesson: any, lessonIndex: number, lessonArray: any[]) => {
    let adaptedLesson = {
      _id: lesson._id,
      name: lesson.name,
      units: [],
    };

    let units = lesson.units;

    units.forEach(async (unit: any, index: number, unitArray: any[]) => {
      if (unit.type == "preTest") {
        const quizId = unit.preTest.learningObjects[0].quiz[0]._id;
        unit._doc.quiz = {
          questions: [quizId],
          score: 0,
          analysis: {},
        };
        unit._doc.preTest = unit.preTest._id;
      }

      if (unit.type == "quiz") {
        const questions = unit._doc.quiz;
        unit._doc.quiz = {
          questions: [...questions],
          score: 0,
          analysis: {},
        };
      }
      if (unit.type == "note") {
        console.log(unit);
      }

      // Check if linked to a concept
      if (unit.isConceptLink) {
        let adaptedUnit = {
          // _id: unit._id,
          name: unit.name,
          isConceptLink: true,
          quiz: unit.quiz,
          isCompleted: false,
          duration: "0",
        };

        let learningObject = unit.loId;

        // Get learning style preferences
        const inputStyle = learningStyle.detectedLearningStyle.input;
        const processingStyle = learningStyle.detectedLearningStyle.processing;
        const understandingStyle = learningStyle.detectedLearningStyle.understanding;
        const perceptionStyle = learningStyle.detectedLearningStyle.perception;

        // Consider perception dimension
        switch (perceptionStyle) {
          case "visual":
            // Add video
            let video = populateNewUnit(adaptedUnit, "video", learningObject.visual, true);
            video && adaptedLesson.units.push(video);

            // Add visual note
            let visualNote = populateNewUnit(adaptedUnit, "visualNote", learningObject.visual);
            if (visualNote) {
              visualNote.name = `Note: ${unit.name}`;
              adaptedLesson.units.push(visualNote);
            }

            // Add mindmap
            let mindmap = populateNewUnit(adaptedUnit, "mindmap", learningObject.visual);
            if (mindmap) {
              mindmap.name = `Mind Map: ${unit.name}`;
              adaptedLesson.units.push(mindmap);
            }

            break;

          case "verbal":
          case "balanced":
            // Add video
            let videoBalanced = populateNewUnit(adaptedUnit, "video", learningObject.visual, true);
            videoBalanced && adaptedLesson.units.push(videoBalanced);

            // Add text-rich file
            let textRichFile = populateNewUnit(adaptedUnit, "textRichFile", learningObject.verbal);
            if (textRichFile) {
              textRichFile.name = `Note: ${unit.name}`;
              adaptedLesson.units.push(textRichFile);
            }

            break;
        }

        // Consider input dimension
        switch (inputStyle) {
          case "intuitive":
            switch (perceptionStyle) {
              case "visual":
                // Add additional video
                let additionalVideo = populateNewUnit(adaptedUnit, "additionalVideo", learningObject.intuitive);
                if (additionalVideo) {
                  additionalVideo.name = `Additional Video: ${unit.name}`;
                  additionalVideo && adaptedLesson.units.push(additionalVideo);
                }

                break;

              case "verbal":
                // Add additional materials
                let additionalMaterials = populateNewUnit(adaptedUnit, "additionalMaterials", learningObject.intuitive);
                if (additionalMaterials) {
                  additionalMaterials.name = `Additional Materials: ${unit.name}`;
                  adaptedLesson.units.push(additionalMaterials);
                }

                break;

              case "balanced":
                // Add additional video
                let additionalVideoBalanced = populateNewUnit(adaptedUnit, "additionalVideo", learningObject.intuitive);
                if (additionalVideoBalanced) {
                  additionalVideoBalanced.name = `Additional Video: ${unit.name}`;
                  adaptedLesson.units.push(additionalVideoBalanced);
                }

                // Add additional materials
                let additionalMaterialsBalanced = populateNewUnit(adaptedUnit, "additionalMaterials", learningObject.intuitive);
                if (additionalMaterialsBalanced) {
                  additionalMaterialsBalanced.name = `Additional Materials: ${unit.name}`;
                  adaptedLesson.units.push(additionalMaterialsBalanced);
                }

                break;
            }

            break;

          case "sensing":
            switch (perceptionStyle) {
              case "visual":
                // Add real example video
                let realExampleVideo = populateNewUnit(adaptedUnit, "realExampleVideo", learningObject.sensing);
                if (realExampleVideo) {
                  realExampleVideo.name = `Real World Examples: ${unit.name}`;
                  adaptedLesson.units.push(realExampleVideo);
                }

                break;

              case "verbal":
                // Add real example doc
                let realExampleDoc = populateNewUnit(adaptedUnit, "realExampleDoc", learningObject.sensing);
                if (realExampleDoc) {
                  realExampleDoc.name = `Real World Examples: ${unit.name}`;
                  adaptedLesson.units.push(realExampleDoc);
                }

                break;
            }

            break;
        }

        // Consider processing dimension
        switch (processingStyle) {
          case "balanced":
          case "active":
            // Add quiz

            let quiz = learningObject.active.quiz.map((quizObject: any) => quizObject._id);
            adaptedUnit.name = `Quiz: ${unit.name}`;
            adaptedUnit["quiz"] = {};
            adaptedUnit["type"] = "quiz";
            adaptedUnit["quiz"].questions = quiz;
            adaptedUnit["quiz"].score = 0;
            quiz && adaptedLesson.units.push(adaptedUnit);

            break;

          case "reflective":
            // Add mindmap if perception style is not visual (to avoid duplicates)
            if (perceptionStyle !== "visual") {
              let mindmap = populateNewUnit(adaptedUnit, "mindmap", learningObject.visual);
              if (mindmap) {
                mindmap.name = `Mind Map: ${unit.name}`;
                adaptedLesson.units.push(mindmap);
              }
            }

            let quizReflective = learningObject.active.quiz.map((quizObject: any) => quizObject._id);
            adaptedUnit["quiz"] = {};
            adaptedUnit["type"] = "quiz";
            adaptedUnit["quiz"].questions = quizReflective;
            adaptedUnit["quiz"].score = 0;
            adaptedUnit.name = `Quiz: ${unit.name}`;
            quizReflective && adaptedLesson.units.push(adaptedUnit);

            break;
        }
      } else {
        unit._doc.isCompleted = false;
        unit._doc.duration = 0;
        adaptedLesson.units.push(unit);
      }
    });
    adaptedCurriculum.push(adaptedLesson);
  });

  return adaptedCurriculum;
};

export const adjustCurriculumToKnowledge = async (email: string, quizResults: any[]) => {
  const userId: any = await UserService.getInstance().getUserIdByEmail(email);
  const learningStyle: any = await LearningStyleService.getInstance().getLearningStyleByUserId(userId);

  const inputStyle = learningStyle.detectedLearningStyle.input;
  const processingStyle = learningStyle.detectedLearningStyle.processing;
  const understandingStyle = learningStyle.detectedLearningStyle.understanding;
  const perceptionStyle = learningStyle.detectedLearningStyle.perception;

  let recommendations = {
    _id: randomUUID(),
    name: "Recommendations",
    units: [],
  };

  let recommendationUnitBase = {
    _id: randomUUID(),
    isConceptLink: true,
    isCompleted: false,
    duration: "0",
    currentUnit: {
      sectionNum: 0,
      unitNum: 0,
      duration: 0,
    },
  };

  const promises = quizResults.map(async (loId: any) => {
    const lo: any = await LearningObjectService.getInstance().getLearningObjectById(loId);

    recommendationUnitBase["name"] = `[Supplementary] ${lo.name}`;

    // Consider perception dimension
    switch (perceptionStyle) {
      case "visual":
        // Add video
        let video = populateNewUnit(recommendationUnitBase, "video", lo.visual);
        video && recommendations.units.push(video);

        // Add visual note
        let visualNote = populateNewUnit(recommendationUnitBase, "visualNote", lo.visual);
        visualNote && recommendations.units.push(visualNote);

        // Add mindmap
        let mindmap = populateNewUnit(recommendationUnitBase, "mindmap", lo.visual);
        mindmap && recommendations.units.push(mindmap);

        break;

      case "verbal":
      case "balanced":
        // Add video
        let videoBalanced = populateNewUnit(recommendationUnitBase, "video", lo.visual);
        videoBalanced && recommendations.units.push(videoBalanced);

        // Add text-rich file
        let textRichFile = populateNewUnit(recommendationUnitBase, "textRichFile", lo.verbal);
        textRichFile && recommendations.units.push(textRichFile);
        break;
    }

    // Consider input dimension
    switch (inputStyle) {
      case "intuitive":
        switch (perceptionStyle) {
          case "visual":
            // Add additional video
            let additionalVideo = populateNewUnit(recommendationUnitBase, "additionalVideo", lo.intuitive);
            additionalVideo && recommendations.units.push(additionalVideo);
            break;

          case "verbal":
            // Add additional materials
            let additionalMaterials = populateNewUnit(recommendationUnitBase, "additionalMaterials", lo.intuitive);
            additionalMaterials && recommendations.units.push(additionalMaterials);
            break;

          case "balanced":
            // Add additional video
            let additionalVideoBalanced = populateNewUnit(recommendationUnitBase, "additionalVideo", lo.intuitive);
            additionalVideoBalanced && recommendations.units.push(additionalVideoBalanced);

            // Add additional materials
            let additionalMaterialsBalanced = populateNewUnit(recommendationUnitBase, "additionalMaterials", lo.intuitive);
            additionalMaterialsBalanced && recommendations.units.push(additionalMaterialsBalanced);

            break;
        }

        break;

      case "sensing":
        switch (perceptionStyle) {
          case "visual":
            // Add real example video
            let realExampleVideo = populateNewUnit(recommendationUnitBase, "realExampleVideo", lo.intuitive);
            realExampleVideo && recommendations.units.push(realExampleVideo);
            break;

          case "verbal":
            // Add real example doc
            let realExampleDoc = populateNewUnit(recommendationUnitBase, "realExampleDoc", lo.intuitive);
            realExampleDoc && recommendations.units.push(realExampleDoc);
            break;
        }

        break;
    }

    // Consider processing dimension
    switch (processingStyle) {
      case "active":
        // Add quiz
        let quiz = lo.active.quiz.map((quizObject: any) => quizObject._id);
        recommendationUnitBase["name"] = `[Supplementary] Quiz: ${lo.name}`;
        recommendationUnitBase["quiz"] = {};
        recommendationUnitBase["type"] = "quiz";
        recommendationUnitBase["quiz"].questions = quiz;
        recommendationUnitBase["quiz"].score = 0;
        quiz && recommendations.units.push(recommendationUnitBase);
        break;

      case "reflective":
        // Add mindmap if perception style is not visual (to avoid duplicates)
        if (perceptionStyle !== "visual") {
          let mindmap = populateNewUnit(recommendationUnitBase, "mindmap", lo.visual);
          mindmap && recommendations.units.push(mindmap);
          break;
        }
    }
  });

  await Promise.all(promises);
  return recommendations;
};

const populateNewUnit = (unitBase: any, unitType: string, loForStyle: any, idOnly: boolean = false): any => {
  let unit = JSON.parse(JSON.stringify(unitBase));
  unit["type"] = unitType;

  if (loForStyle[unitType]) {
    unit[unitType] = idOnly ? loForStyle[unitType]._id : loForStyle[unitType];
    return unit;
  }

  return null;
};

export const adjustCurriculumToKnowledgeTest = async (req: any, res: any) => {
  const email = req.params.email;
  const quizResults = req.body;

  const results = await adjustCurriculumToKnowledge(email, quizResults);

  res.status(200).send(results);
};
