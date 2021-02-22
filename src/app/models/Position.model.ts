import { Attribution } from './attribution.model';
import { BusinessUnit } from "./BusinessUnit.model";
import { Category } from "./Category.model";
import { Company } from './Company.model';
import { EvaluationCriteria } from "./EvaluationCriteria.model";
import { Mission } from "./Mission.model";
import { PositionEvaluationCriteria } from './PositionEvaluationCriteria.model';
import { PositionIndicator } from "./PositionIndicator.model";
import { PositionSubSkill } from "./PositionSubSkill.model";
import { UserPosition } from "./UserPosition.model";

export class Position {
    
    createdAt
    updatedAt
    positionId: number;
    positionCode: string;
    positionLabel: string
    hierarchicalManagerPosition: Position;
    fonctionalManagerPosition: Position[];
    positionWeight: number;
    businessUnit: BusinessUnit;
    company:Company;
    attributions:Attribution[];
    evaluationCriteriaList : PositionEvaluationCriteria[] = []
    positionCategory : Category
    missions : Mission[]
    //userPosition :UserPosition;
    //positionSubSkillList: PositionSubSkill[];
    //positionIndicatorList: PositionIndicator[];

    constructor(){ 
        
    }
   
}