import {Config} from "./interfaces/config";
import {PedidoConsulta} from "./methods/pedido.consulta";
import {PedidoConsultaLote} from "./methods/pedido.consulta.lote";
import {PaulistanaRepository} from "./paulistana.repository";
import {XMLBuildStrategy} from "./strategy/XML.build.strategy";
import {SolicitarConsultarNfe} from "./interfaces/solicitacoes/solicitar.consulta.nfe";
import {SolicitarConsultaLote} from "./interfaces/solicitacoes/solicitar.consulta.lote";
import {SocilitarCancelamentoNfe} from "./interfaces/solicitacoes/socilitar.cancelamento.nfe";
import {PedidoCancelaNfe} from "./methods/pedido.cancela.nfe";
import * as parser from 'xml2json-light';

export class NfePaulistana {

    public config: Config;
    public repository: PaulistanaRepository;
    private retorno_xml;

    constructor(config : Config) {
        this.config = config;
        this.repository = new PaulistanaRepository(config)
    }

    public async consultarNFe(data: SolicitarConsultarNfe) {
        const xml = await new XMLBuildStrategy(new PedidoConsulta(data), this.config).build();
        return this.response(await this.repository.consultaNFe(xml))
    }

    public async consultarLote(data: SolicitarConsultaLote) {
        const xml = await new XMLBuildStrategy(new PedidoConsultaLote(data), this.config).build();
        return this.repository.consultarLote(xml)
    }

    public async cancelarNFe(data: SocilitarCancelamentoNfe) {
        const xml = await new XMLBuildStrategy(new PedidoCancelaNfe(data,this.config),this.config).build()
        return this.repository.cancelarNfe(xml)
    }

    private response(data) {
        const json = () => parser.xml2json(data);
        const xml = () =>  data;
        return {json,xml}
    }
    public json() {}
    public xml() {}
}
