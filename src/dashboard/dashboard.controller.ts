import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }
  @Get()
  findRecentEvent(@Query()user) {
    return this.dashboardService.findRecentEvent(user);
  }
}
