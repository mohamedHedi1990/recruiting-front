import { TreeNode } from "primeng/api";

export class Tree {
    label: string;
    expandedIcon= "pi pi-folder-open";
    collapsedIcon = "pi pi-folder";
    children :TreeNode[]
  
    constructor( label: string, children :Tree[]){
        this.label = label;
        this.children = children;
    }
   
  }
  