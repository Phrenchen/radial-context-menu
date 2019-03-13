import { Injectable, Output, EventEmitter } from '@angular/core';
import Axios, { AxiosResponse } from 'axios';
import { MenuItem } from '../radial-menu/model/MenuItem';
import { MenuAction } from '../radial-menu/model/MenuAction';

/**
 * Mixcloud connector / service
 */
@Injectable({
  providedIn: 'root'
})
export class MixcloudService {

  private static USER_THESNOOZE = 'thesnooze';

  private static CLOUD_CASTS = 'cloudcasts';


  constructor() { }

  /**
   * returns url for Mixcloud API
   */
  private static getEndPointBase(user: string, requestName: string): string {
    return 'https://api.mixcloud.com/' + user + '/' + requestName + '/';
  }



  /**
   * gets consecutive bacth of CloudCasts
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

  public parseCloudcast(cloudcastBlob): Array<MenuItem> {
    const casts: Array<MenuItem> = new Array<MenuItem>();
    let menuItem: MenuItem;

    (cloudcastBlob.data).forEach( cloudcast => {
      menuItem = new MenuItem();
      menuItem.id = cloudcast.slug;         // define id used for retrieving menu item by clicked HTMLElement. key in menuItem-map
      menuItem.data = cloudcast;
      menuItem.actions.push(MenuAction.SHOW_TITLE);
      menuItem.actions.push(MenuAction.SHOW_DESCRIPTION);
      menuItem.actions.push(MenuAction.SHOW_THUMBNAIL);
      casts.push(menuItem);
    });

    return casts;
  }


  // PRIVATE
  private convertToBlob(mixcloudResponse) {
    const items: Array<any> = mixcloudResponse.data;

    items.map(item => {
      item.thumbnailUrl = item.pictures.medium;
    });

    return mixcloudResponse;
  }
}
