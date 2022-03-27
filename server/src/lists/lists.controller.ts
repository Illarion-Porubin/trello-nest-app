import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateListsDto } from './dto/create.list.dto';
import { ListsService } from './lists.sevice';

@Controller('lists')
export class ListsController {
  constructor(private listsService: ListsService) {}

  @Post()
  create(@Body() listsDto: CreateListsDto) {
    return this.listsService.createList(listsDto);
  }

  @Get()
  getAll() {
    return this.listsService.getAllLists();
  }
}
