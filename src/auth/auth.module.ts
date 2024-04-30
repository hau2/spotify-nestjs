import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt-strategy'
import { ArtistsModule } from 'src/artists/artists.module'
import { ApiKeyStrategy } from './api-key-strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: '1d'
        }
      }),
      inject: [ConfigService]
    }),
    ArtistsModule
  ],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}

/*

Trong NestJS, imports: [ConfigModule] trong JwtModule.registerAsync() nghĩa là ConfigModule sẽ được import vào JwtModule.

ConfigModule là một module cung cấp các dịch vụ liên quan đến cấu hình, như việc đọc các biến môi trường hoặc tệp cấu hình. Trong trường hợp này, ConfigModule được sử dụng để cung cấp ConfigService, một dịch vụ cho phép bạn truy cập vào các giá trị cấu hình.

Khi JwtModule được khởi tạo, ConfigModule sẽ được khởi tạo trước và ConfigService sẽ được tạo ra. Sau đó, ConfigService sẽ được tiêm vào hàm tạo của JwtModule (như đã được đề cập trong inject: [ConfigService]), cho phép JwtModule sử dụng ConfigService để lấy các giá trị cấu hình.

Vì vậy, imports: [ConfigModule] đảm bảo rằng ConfigService có sẵn để sử dụng khi khởi tạo JwtModule.


*/
