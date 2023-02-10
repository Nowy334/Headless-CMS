import { Test, TestingModule } from '@nestjs/testing';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';
import { snippetStub } from './stubs/snippets.stub';

jest.mock('./snippets.service');

describe('SnippetsController', () => {
  let snippetsController: SnippetsController;
  let snippetsService: SnippetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnippetsController],
      providers: [SnippetsService],
    }).compile();

    snippetsController = module.get<SnippetsController>(SnippetsController);
    snippetsService = module.get<SnippetsService>(SnippetsService);
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called with snippet symbol', () => {
      let snippet;

      beforeEach(async () => {
        snippet = await snippetsController.findOne(
          snippetStub().success.symbol,
        );
      });

      it('then it should call snippetsService ', () => {
        expect(snippetsService.findOne).toBeCalledWith(
          snippetStub().success.symbol,
        );
      });

      it('then it should return a snippet ', () => {
        expect(snippet).toEqual(snippetStub().success);
      });
    });

    describe('when findOne is called without snippet symbol', () => {
      let error;

      beforeEach(async () => {
        error = snippetStub().error;
      });

      it('then it should return error', () => {
        expect(error).toEqual(snippetStub().error);
      });
    });
  });
});
