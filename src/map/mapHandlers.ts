﻿import { MapModel } from "./mapModel";
import { IContentDropHandler, IContentDescriptor, IDataTransfer, IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { MapContract } from "./mapContract";
import { Geolocation } from "@paperbits/common/geocoding";


export class MapHandlers implements IWidgetHandler /*, IContentDropHandler */ {
    public name: string = "map";
    public displayName: string = "Map";

    private async prepareWidgetOrder(config: MapContract): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "map",
            displayName: "Map",
            iconClass: "widget-icon widget-icon-map",
            requires: ["html", "js"],
            createModel: async () => {
                const model = new MapModel();
                model.location = config.location;
                model.caption = config.caption;
                model.location = config.location;
                model.mapType = config.mapType;
                return model;
            }
        };

        return widgetOrder;
    }

    private async getWidgetOrderByConfig(location: Geolocation, caption: string): Promise<IWidgetOrder> {
        const config: MapContract = {
            type: "map",
            location: location,
            caption: caption,
            mapType: "terrain"
        };
        return await this.prepareWidgetOrder(config);
    }

    public getWidgetOrder(): Promise<IWidgetOrder> {
        return Promise.resolve(this.getWidgetOrderByConfig({ address: "400 Broad St, Seattle, WA 98109", lat: 47.6203953, lng: -122.3493709 }, "Space Needle"));
    }

    // public getContentDescriptorFromDataTransfer(dataTransfer: IDataTransfer): IContentDescriptor {
    //     const mapConfig = this.parseDataTransfer(dataTransfer);

    //     if (!mapConfig) {
    //         return null;
    //     }

    //     const getThumbnailPromise = () => Promise.resolve(`https://maps.googleapis.com/maps/api/staticmap?center=${mapConfig.location}&format=jpg&size=130x90`);

    //     const descriptor: IContentDescriptor = {
    //         title: "Map",
    //         description: mapConfig.location.toString(),
    //         getWidgetOrder: () => Promise.resolve(this.getWidgetOrderByConfig(mapConfig.location.toString(), mapConfig.caption)),
    //         getThumbnailUrl: getThumbnailPromise
    //     };

    //     return descriptor;
    // }

    // private parseDataTransfer(dataTransfer: IDataTransfer): MapContract {
    //     const source = dataTransfer.source;

    //     if (source && typeof source === "string") {
    //         const url = source.toLowerCase();

    //         if (url.startsWith("https://www.google.com/maps/") || url.startsWith("http://www.google.com/maps/")) {
    //             let location: string;
    //             let match = new RegExp("/place/([^/]+)").exec(url);

    //             if (match && match.length > 1) {
    //                 location = match[1].replaceAll("+", " ");
    //             }
    //             else {
    //                 match = new RegExp("/@([^/]+)").exec(url);
    //                 if (match && match.length > 1) {
    //                     const locationParts = match[1].split(",");
    //                     location = locationParts.slice(0, 2).join(",");
    //                 }
    //             }

    //             return   location ? { location: location.toString(), type: "map" } : null;
    //         }
    //     }

    //     return null;
}