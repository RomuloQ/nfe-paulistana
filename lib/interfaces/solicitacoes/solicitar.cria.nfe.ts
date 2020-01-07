export interface SolicitarCriaNfe {
    tomadorCPF: string;
    tomadorEmail: string;
    tomadorRazaoSocial: string;
    discriminacao: string;
    serieRPS: string;
    aliquotaServicos: number;
    codServico: string;
    valorDeducoes: number;
    valorServico: number;
    tipoRPS: string;
    valorCOFINS: number;
    valorINSS: number;
    valorIR: number;
    valorPIS: number;
    ISSRetido: boolean;
    statusRPS: string;
    valorCSLL: number;
}
