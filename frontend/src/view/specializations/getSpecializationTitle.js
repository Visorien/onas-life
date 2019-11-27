import { Degree } from "../../model/enums/Degree";

const DEGREE_TRANSLATIONS = {
    [Degree.MASTER]: 'магістр',
    [Degree.BACHELOR]: 'бакалавр',
};

export const getSpecializationTitle = (specialization) => {
    if (!specialization.degree) {
        return specialization.name;
    }

    return `${specialization.name} (${DEGREE_TRANSLATIONS[specialization.degree]})`; 
};
