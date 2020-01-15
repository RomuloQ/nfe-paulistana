import * as fs from "fs";
import * as soap from 'soap';
import * as util from "util";
import {Auth} from "./interfaces/auth";

export class PaulistanaRepository {

    constructor(private  readonly config: Auth) {}

    public async consultaNFe(xml: string) {
        const client = await PaulistanaSOAP.client(this.config);
        const request = util.promisify(client.ConsultaNFe);
        return PaulistanaSOAP.sendXML(request,xml);
    }

    public async consultarLote(xml: string) {
        const client = await PaulistanaSOAP.client(this.config);
        const request = util.promisify(client.ConsultaLote);
        return PaulistanaSOAP.sendXML(request,xml);
    }

    public async cancelarNfe(xml: string) {
        const client = await PaulistanaSOAP.client(this.config);
        const request = util.promisify(client.CancelamentoNFe);
        return PaulistanaSOAP.sendXML(request,xml);
    }

    public async testCreateNfeLote(xml: string) {
        const client = await PaulistanaSOAP.client(this.config);
        const request = util.promisify(client.TesteEnvioLoteRPS);
        return PaulistanaSOAP.sendXML(request,xml);
    }



    public async criarNfe() {
        const client = await PaulistanaSOAP.client(this.config);
        const request = util.promisify(client.EnvioRPS);
    }

}


class PaulistanaSOAP {
    static async client(config: Auth) {
        const request = await soap.createClientAsync('https://nfe.prefeitura.sp.gov.br/ws/lotenfe.asmx?WSDL', {
            wsdl_options: {
                pfx :  fs.readFileSync(config.certificado.path),
                passphrase: config.certificado.senha,
            },
        });

        request.setSecurity(new soap.ClientSSLSecurityPFX(
            `${config.certificado.path}`, config.certificado.senha,
        ));

        return request;
    }

    static sendXML(request, xml: string) {
        return request({ VersaoSchema: '1', MensagemXML: xml }).then(res => res.RetornoXML);
    }
}
