import { TreeNode } from "primeng/api";

export class Tree {
    label: string;
    expandedIcon= "pi pi-share-alt";
    collapsedIcon = "pi pi-share-alt";
    data: any;
    children :TreeNode[];
    expanded :boolean;
  
    constructor(data:any, label: string, children :Tree[]){
        this.data= data;
        this.label = label;
        this.children = children;
    }
   
  }
  