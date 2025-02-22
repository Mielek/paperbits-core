import * as Utils from "@paperbits/common/utils";
import { CardModel } from "./cardModel";
import { CardContract } from "./cardContract";
import { IWidgetService, ModelBinderSelector } from "@paperbits/common/widgets";
import { Contract, Bag } from "@paperbits/common";
import { ContainerModelBinder, IModelBinder } from "@paperbits/common/editing";

export class CardModelBinder extends ContainerModelBinder implements IModelBinder<CardModel> {
    constructor(protected readonly widgetService: IWidgetService, protected modelBinderSelector: ModelBinderSelector) {
        super(widgetService, modelBinderSelector);
    }

    public canHandleContract(contract: Contract): boolean {
        return contract.type === "card";
    }

    public canHandleModel(model: Object): boolean {
        return model instanceof CardModel;
    }

    public async contractToModel(contract: CardContract, bindingContext?: Bag<any>): Promise<CardModel> {
        const model = new CardModel();

        if (contract.alignment) {
            contract.alignment = Utils.optimizeBreakpoints(contract.alignment);
            model.alignment = contract.alignment;
        }

        model.overflowX = contract.overflowX;
        model.overflowY = contract.overflowY;
        model.styles = contract.styles;
        model.widgets = await this.getChildModels(contract.nodes, bindingContext);

        return model;
    }

    public modelToContract(model: CardModel): Contract {
        const contract: CardContract = {
            type: "card",
            styles: model.styles,
            nodes: this.getChildContracts(model.widgets),
            alignment: model.alignment,
            overflowX: model.overflowX,
            overflowY: model.overflowY
        };

        return contract;
    }
}
