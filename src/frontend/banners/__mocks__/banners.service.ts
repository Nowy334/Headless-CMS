import { bannerStub } from '../stubs/banners.stub';

export const BannersService = jest.fn().mockReturnValue({
  findByCategory: jest.fn().mockReturnValue([bannerStub().success]),
  findOne: jest.fn().mockReturnValue(bannerStub().success),
});
