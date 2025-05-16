import { TestBed } from '@angular/core/testing';

import { CategoryService } from './service-category.service';

describe('ServiceCategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
