import { Body, Controller,  Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TermbaseViewService } from './service';
import { TERMBASE_SIMPLE, QUERY_DTO } from './class';

@ApiTags('termbase查询')
@Controller('/termbase')
@Controller()
export class TermbaseViewController {
  constructor(
    private readonly service: TermbaseViewService,
    ) {}

  @Post('/query')
  @ApiOperation({
    summary: '获取列表'
  })
  @ApiResponse({ type: [TERMBASE_SIMPLE] })
  @ApiBody({ type: QUERY_DTO })
  query(@Body() body: QUERY_DTO) {
    return this.service.query(body.content, body.locale);
  }
}
