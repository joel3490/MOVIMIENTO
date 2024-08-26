import { string, object, array, number, InferOutput } from 'valibot'

export const FplSchema = object({   
    id_amhs: number(), 
    fechaHora: string(), 
    cabecera: string(),                
    mensaje: string(), 
    c1: string(), 
    c2: string(), 
    c3: string(), 
    c4: string(), 
    c5: string(), 
    c6: string(), 
    c7: string(), 
    c8: string(),                
    tipoMensaje: string()
})

export const FplsSchema  = array(FplSchema)
export type Fpl = InferOutput <typeof FplsSchema>

export type Fpls = {
    id: number;
    fechaHora: string;
    c1: string
    c2: string
    c3: string
    c4: string
    c5: string
    c6: string
    c7: string
    c8: string
};

export type fpl = {
    id: number;
    fechaHora: string;
    c1: string;
    c2: string;
    c3: string;
    c4: string;
    c5: string;
    c6: string;
    c7: string;
    c8: string;
  };