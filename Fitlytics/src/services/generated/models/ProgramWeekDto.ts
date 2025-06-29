/* tslint:disable */
/* eslint-disable */
/**
 * Backend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { WorkoutDto } from './WorkoutDto';
import {
    WorkoutDtoFromJSON,
    WorkoutDtoFromJSONTyped,
    WorkoutDtoToJSON,
    WorkoutDtoToJSONTyped,
} from './WorkoutDto';

/**
 * 
 * @export
 * @interface ProgramWeekDto
 */
export interface ProgramWeekDto {
    /**
     * 
     * @type {string}
     * @memberof ProgramWeekDto
     */
    programWeekId?: string;
    /**
     * 
     * @type {number}
     * @memberof ProgramWeekDto
     */
    weekNumber: number;
    /**
     * 
     * @type {Array<WorkoutDto>}
     * @memberof ProgramWeekDto
     */
    workouts: Array<WorkoutDto> | null;
}

/**
 * Check if a given object implements the ProgramWeekDto interface.
 */
export function instanceOfProgramWeekDto(value: object): value is ProgramWeekDto {
    if (!('weekNumber' in value) || value['weekNumber'] === undefined) return false;
    if (!('workouts' in value) || value['workouts'] === undefined) return false;
    return true;
}

export function ProgramWeekDtoFromJSON(json: any): ProgramWeekDto {
    return ProgramWeekDtoFromJSONTyped(json, false);
}

export function ProgramWeekDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProgramWeekDto {
    if (json == null) {
        return json;
    }
    return {
        
        'programWeekId': json['programWeekId'] == null ? undefined : json['programWeekId'],
        'weekNumber': json['weekNumber'],
        'workouts': (json['workouts'] == null ? null : (json['workouts'] as Array<any>).map(WorkoutDtoFromJSON)),
    };
}

export function ProgramWeekDtoToJSON(json: any): ProgramWeekDto {
    return ProgramWeekDtoToJSONTyped(json, false);
}

export function ProgramWeekDtoToJSONTyped(value?: ProgramWeekDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'programWeekId': value['programWeekId'],
        'weekNumber': value['weekNumber'],
        'workouts': (value['workouts'] == null ? null : (value['workouts'] as Array<any>).map(WorkoutDtoToJSON)),
    };
}

