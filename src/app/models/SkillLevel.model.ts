export class SkillLevel{
    createdAt
    updatedAt
    skillLevelId
    skillLevelLabel: string
    skillLevelCode: string
    skillLevelDetails: string
    orderValue 

    constructor(){
        this.skillLevelId= null
        this.skillLevelLabel= ""
        this.skillLevelCode=null
        this.skillLevelDetails= null
        this.orderValue = null
    }
}