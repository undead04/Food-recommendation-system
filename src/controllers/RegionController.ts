import { RepositoryDTO } from "../utils/ReponseDTO";
import RegionService from "../services/RegionService";
import { Get, Route, Tags } from "tsoa";
@Route("/region")
@Tags("Region")
export class RegionController {
  private service = new RegionService();
  @Get("/")
  async getFilter() {
    const data = await this.service.getFilter();
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }
}
