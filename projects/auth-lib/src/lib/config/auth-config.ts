import { InjectionToken } from "@angular/core";
import { AuthConfig } from "../models/auth-config.model";

export const API_CONFIG = new InjectionToken<AuthConfig>('apiConfig');