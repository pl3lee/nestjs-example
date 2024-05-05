import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  // since our service is an injectable, we are telling nest to automatically inject and instantiate the service into the controller
  constructor(private readonly ninjaServices: NinjasService) {}

  // GET /ninjas?weapon=... - returns all ninjas
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this.ninjaServices.getNinjas(weapon);
  }
  // GET /ninjas/:id - returns a single ninja
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaServices.getNinja(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  // POST /ninjas - creates a new ninja
  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaServices.createNinja(createNinjaDto);
  }
  // PUT /ninjas/:id - updates a ninja
  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjaServices.updateNinja(id, updateNinjaDto);
  }
  // DELETE /ninjas/:id - deletes a ninja
  @Delete(':id')
  deleteNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaServices.removeNinja(id);
  }
}
