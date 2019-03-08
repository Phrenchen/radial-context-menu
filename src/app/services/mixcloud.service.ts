import { Injectable, Output, EventEmitter } from '@angular/core';
import Axios, { AxiosResponse } from 'axios';

/**
 * Mixcloud connector / service
 * @module Mixcloud
 * @class MixcloudService
 */
@Injectable({
  providedIn: 'root'
})
export class MixcloudService {

  private static USER_THESNOOZE = 'thesnooze';

  private static CLOUD_CASTS = 'cloudcasts';
  private static META_DATA = '?metadata=1';


  constructor() { }

  /**
   * returns url for Mixcloud API
   * @private
   * @method getEndPointBase
   * @param {string} user
   * @param {string} requestName
   */
  private static getEndPointBase(user: string, requestName: string): string {
    return 'https://api.mixcloud.com/' + user + '/' + requestName + '/';
  }



  /**
   * gets consecutive bacth of CloudCasts
   * @method async getNextCloudcastBatch
   * @param {string} batchUrl
   * @return {Promise<any>}
   */
  public async getNextCloudcastBatch(batchUrl: string): Promise<any> {
    return Axios.get(batchUrl)
      .then((response: AxiosResponse<any>) => {
        return response.data;
      })
      .catch(error => {
        console.log('error: ' + error);
        return null;
      });
  }

  /**
   * via HTTP GET
   * @method async getCloudcasts
   * @param {number} limit - max amount of items collected. default is 100 (soft-limit)
   * @return {Promise<any>}
   */
  public async getCloudcasts(limit: number = 0): Promise<any> {
    let endpoint = MixcloudService.getEndPointBase(MixcloudService.USER_THESNOOZE, MixcloudService.CLOUD_CASTS);
    // batches contain max 100 cloudcasts. load in batches of a 100
    if (limit === 0) {
      // const metaData = await this.getMetaData();
      // limit = metaData.cloudcast_count;
      limit = 100;
    }

    endpoint += '?limit=' + limit;

    return Axios.get(endpoint)
      .then((response: AxiosResponse<any>) => {
        const resultBlob = this.convertToBlob(response.data);
        return resultBlob;
      })
      .catch(error => {
        console.log('error: ' + error);
        return null;
      });
  }

  private convertToBlob(mixcloudResponse) {
    console.log(mixcloudResponse);
    const items: Array<any> = mixcloudResponse.data;

    items.map(item => {
      item.thumbnailUrl = item.pictures.medium;
    });

    return mixcloudResponse;
  }

  /**
   * helper method to retrieve metaData.
   * @method getMetaData
   * @deprecated
   */
  private getMetaData(): Promise<any> {
    const endpoint = MixcloudService.getEndPointBase(MixcloudService.USER_THESNOOZE, MixcloudService.META_DATA);

    return Axios.get(endpoint)
      .then((response: AxiosResponse<any>) => {
        return response.data;

      })
      .catch(error => {
        console.log('error: ' + error);
        return null;
      });
  }
}
