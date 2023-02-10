import { Test, TestingModule } from '@nestjs/testing';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import { bannerStub } from './stubs/banners.stub';

jest.mock('./banners.service');

describe('BannersController', () => {
  let bannersController: BannersController;
  let bannersService: BannersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannersController],
      providers: [BannersService],
    }).compile();

    bannersController = module.get<BannersController>(BannersController);
    bannersService = module.get<BannersService>(BannersService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called with params', () => {
      let banner;

      beforeEach(async () => {
        banner = await bannersController.findOne(bannerStub().success._id);
      });

      it('then it should call bannersService ', () => {
        expect(bannersService.findOne).toBeCalledWith(bannerStub().success._id);
      });

      it('then it should return a banner ', () => {
        expect(banner).toEqual(bannerStub().success);
      });
    });

    describe('when findOne is called without params', () => {
      let error;

      beforeEach(async () => {
        error = bannerStub().error;
      });

      it('then it should return error', () => {
        expect(error).toEqual(bannerStub().error);
      });
    });
  });

  describe('findByCategory', () => {
    describe('when findByCategory is called with params', () => {
      let banner;

      beforeEach(async () => {
        banner = await bannersController.findByCategory(
          bannerStub().success.category,
        );
      });

      it('then it should call bannersService ', () => {
        expect(bannersService.findByCategory).toBeCalledWith(
          bannerStub().success.category,
        );
      });

      it('then it should return a array of banners with the same category ', () => {
        expect(banner).toEqual([bannerStub().success]);
      });
    });

    describe('when findByCategory is called without params', () => {
      let error;

      beforeEach(async () => {
        error = bannerStub().error;
      });

      it('then it should return error', () => {
        expect(error).toEqual(bannerStub().error);
      });
    });
  });
});
