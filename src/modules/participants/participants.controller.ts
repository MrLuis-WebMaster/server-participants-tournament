import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantDto } from './dto/participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}
  @Get()
  async findAll(
    @Query('tournamentId') tournamentId: number,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('searchTerm') searchTerm: string = '',
  ) {
    return this.participantsService.findAll(
      tournamentId,
      page,
      pageSize,
      searchTerm,
    );
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.participantsService.findOne(+id);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() participantDto: ParticipantDto,
  ) {
    return this.participantsService.update(Number(id), participantDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.participantsService.remove(+id);
  }
}
