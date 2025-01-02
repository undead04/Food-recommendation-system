import {  Get, JsonController, QueryParams } from "routing-controllers";
import { RepositoryDTO } from "../utils/ReponseDTO";
import RegionService from "../services/RegionService";

@JsonController('/region')
export default class RegionController {
    private service = new RegionService();

    @Get('/')
    async getFilter(@QueryParams() filter: any) {
        const data = await this.service.getFilter(filter.name || "");
        return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
    }
}
