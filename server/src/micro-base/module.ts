import { Module } from '@nestjs/common';
import { MicroUserService } from './user';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'EEVEE_USER',
        useFactory: async (...a) => {
          console.log(process.env.MICRO_USER_HOST, process.env.MICRO_USER_PORT)
          return {
            transport: Transport.TCP,
            options: {
              host: process.env.MICRO_USER_HOST,
              port: Number(process.env.MICRO_USER_PORT)
            }
          }
        }
      }
    ]),
  ],
  providers: [MicroUserService],
  exports: [MicroUserService],
})
export class MincroBaseModule { }