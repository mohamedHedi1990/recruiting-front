import { TreeNode } from "primeng/api";

export class Tree {
    label: string;
    expandedIcon= "pi pi-folder-open";
    collapsedIcon = "pi pi-folder";
    data: any;
    children :TreeNode[]
  
    constructor(data:any, label: string, children :Tree[]){
        this.data= data;
        this.label = label;
        this.children = children;
    }
   
  }
  