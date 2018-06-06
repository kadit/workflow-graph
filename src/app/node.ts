export class Node {
    private name : string;
    private isConcrete : boolean;
    private allowParallelAddition : boolean;
    private allowSeriesAddition : boolean;
    constructor(name : string, isConcrete : boolean, allowParallelAddition : boolean, allowSeriesAddition : boolean){
        this.name = name;
        this.isConcrete = isConcrete;
        this.allowParallelAddition = allowParallelAddition;
        this.allowSeriesAddition = allowSeriesAddition;
    }

    set AllowParallelAddition(flag : boolean) {
        this.allowParallelAddition = flag;
    }

    set AllowSeriesAddition(flag : boolean) {
        this.allowSeriesAddition = flag;
    }

    
}
