import StatisticsService from "../services/StatisticsService";
import { RepositoryDTO } from "../utils/ReponseDTO";
import AppRole from "../models/modelRequest/AppRole";
import { Get, Path, Route, Security, Tags } from "tsoa";

@Route("/statistics")
@Tags("statistics")
export class StatisticsController {
  private service = new StatisticsService();
  @Get("/recipe")
  @Security("JWT", [`${AppRole.Admin}`])
  async statisticsRecipe() {
    const data = await this.service.statisticsRecipe();
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }

  @Get("/highlyUsers")
  @Security("JWT", [`${AppRole.Admin}`])
  async statisticsHighlyAppreciatedUsers() {
    const data = await this.service.statisticsHighlyAppreciatedUsers();
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }

  @Get("/recipeEngagement/{id}")
  @Security("JWT", [`${AppRole.Admin}`])
  async statisticsRecipeEngagement(@Path("id") id: number) {
    const data = await this.service.statisticsRecipeEngagement(id);
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }

  @Get("/recipeRegion")
  @Security("JWT", [`${AppRole.Admin}`])
  async statisticsRecipesByRegion() {
    const data = await this.service.statisticsRecipesByRegion();
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }

  @Get("/recipeCategory")
  @Security("JWT", [`${AppRole.Admin}`])
  async statisticsRecipesByCategory() {
    const data = await this.service.statisticsRecipesByCategory();
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }

  @Get("/recipeTime")
  @Security("JWT", [`${AppRole.Admin}`])
  async statisticsRecipesTime() {
    const data = await this.service.statisticsRecipesTime();
    return RepositoryDTO.WithData(200, "Lấy dữ liệu thành công", data);
  }
}
