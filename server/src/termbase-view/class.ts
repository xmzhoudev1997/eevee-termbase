
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QUERY_DTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  locale: string;
}


export class TERMBASE_SIMPLE {
  @ApiProperty()
  content: string;
  @ApiProperty()
  translateContent: string;
}