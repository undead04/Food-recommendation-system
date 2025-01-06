import { Get, JsonController, Res } from "routing-controllers";
import { RepositoryDTO } from "../utils/ReponseDTO";
import RegionService from "../services/RegionService";
import { Response } from "express";
@JsonController("/region")
export default class RegionController {
  private service = new RegionService();

  @Get("/")
  async getFilter(@Res() res: Response) {
    const data = await this.service.getFilter();
    return res
      .status(200)
      .json(RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data));
  }
}
