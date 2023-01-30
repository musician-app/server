import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

interface PipeTransformConstructor<T extends PipeTransform> {
     new (): T
}

@Injectable()
export class OptionalParameterPipe implements PipeTransform<any, any> {

     private pipe: PipeTransform;

     constructor(_pipe: PipeTransformConstructor<PipeTransform> | PipeTransform) {
          if (typeof _pipe === "function") this.pipe = new _pipe();
          else this.pipe = _pipe;
     }

     transform(value: any, metadata: ArgumentMetadata) {
          if (value === undefined) return;
          
          return this.pipe.transform(value, metadata);
     }
}
