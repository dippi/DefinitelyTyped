// Type definitions for Google Publisher Tag v104
// Project: https://developers.google.com/doubleclick-gpt/reference
// Definitions by: John Wright <https://github.com/johngeorgewright>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace googletag {
    type SingleSizeArray = [number, number];

    type NamedSize = string;

    type SingleSize = SingleSizeArray | NamedSize;

    type MultiSize = SingleSize[];

    type GeneralSize = SingleSize | MultiSize;

    type SizeMapping = GeneralSize[];

    type SizeMappingArray = SizeMapping[];

    interface CommandArray {
        push(f: () => void): number;
    }

    interface Service {
        addEventListener<T extends keyof events.EventNameMap>(
            eventType: T,
            listener: (event: events.EventNameMap[T]) => void
        ): void;
    }

    interface CompanionAdsService extends Service {
        enableSyncLoading(): void;
        setRefreshUnfilledSlots(value: boolean): void;
    }

    interface ContentService extends Service {
        setContent(slot: Slot, content: String): void;
    }

    interface ResponseInformation {
        advertiserId: string;
        campaignId: string;
        creativeId?: number;
        labelIds?: number[];
        lineItemId?: number;
    }

    interface SafeFrameConfig {
        allowOverlayExpansion?: boolean;
        allowPushExpansion?: boolean;
        sandbox?: boolean;
    }

    interface Googletag {
        apiReady: boolean;
        cmd: CommandArray;
        companionAds(): CompanionAdsService;
        content(): ContentService;
        defineOutOfPageSlot(adUnitPath: string, opt_div?: string): Slot;
        defineSlot(adUnitPath: string, size: GeneralSize, opt_div?: string): Slot;
        destroySlots(opt_slots?: Slot[]): boolean;
        disablePublisherConsole(): void;
        display(div?: string): void;
        enableServices(): void;
        getVersion(): string;
        openConsole(opt_div?: string): void;
        pubads(): PubAdsService;
        pubadsReady: boolean;
        setAdIframeTitle(title: string): void;
        sizeMapping(): SizeMappingBuilder;
    }

    interface Slot {
        addService(service: Service): Slot;
        clearCategoryExclusions(): Slot;
        clearTargeting(opt_key?: string): Slot;
        defineSizeMapping(sizeMapping: SizeMappingArray): Slot;
        get(key: string): string | null;
        getAdUnitPath(): string;
        getAttributeKeys(): string[];
        getCategoryExclusions(): string[];
        getResponseInformation(): ResponseInformation;
        getSlotElementId(): string;
        getTargeting(key: string): string[];
        getTargetingKeys(): string[];
        set(key: string, value: string): Slot;
        setCategoryExclusion(categoryExclusion: string): Slot;
        setClickUrl(value: string): Slot;
        setCollapseEmptyDiv(collapse: boolean, opt_collapseBeforeAdFetch?: boolean): Slot;
        setForceSafeFrame(forceSafeFrame: boolean): Slot;
        setSafeFrameConfig(config: SafeFrameConfig): Slot;
        setTargeting(key: string, value: string | string[]): Slot;
    }

    interface PassbackSlot {
        display(): void;
        get(key: string): string;
        set(key: string, value: string): PassbackSlot;
        setClickUrl(url: string): PassbackSlot;
        setForceSafeFrame(forceSafeFrame: boolean): PassbackSlot;
        setTagForChildDirectedTreatment(value: number): PassbackSlot;
        setTargeting(key: string, value: string | string[]): PassbackSlot;
        updateTargetingFromMap(map: Object): PassbackSlot;
    }

    interface PubAdsService extends Service {
        clear(opt_slots?: Slot[]): boolean;
        clearCategoryExclusions(): PubAdsService;
        clearTagForChildDirectedTreatment(): PubAdsService;
        clearTargeting(opt_key?: string): PubAdsService;
        collapseEmptyDivs(opt_collapseBeforeAdFetch?: boolean): boolean;
        defineOutOfPagePassback(adUnitPath: string): PassbackSlot;
        definePassback(adUnitPath: string, size: GeneralSize): PassbackSlot;
        disableInitialLoad(): void;
        display(adUnitPath: string, size: GeneralSize, opt_div?: string, opt_clickUrl?: string): Slot;
        enableAsyncRendering(): boolean;
        enableSingleRequest(): boolean;
        enableSyncRendering(): boolean;
        enableVideoAds(): void;
        get(key: string): string | null;
        getAttributeKeys(): string[];
        getTargeting(key: string): string[];
        getTargetingKeys(): string[];
        refresh(opt_slots?: Slot[], opt_options?: {changeCorrelator: boolean}): void;
        set(key: string, value: string): PubAdsService;
        setCategoryExclusion(categoryExclusion: string): PubAdsService;
        setCentering(centerAds: boolean): void;
        setCookieOptions(cookieOptions: number): PubAdsService;
        setForceSafeFrame(forceSafeFrame: boolean): PubAdsService;
        setLocation(latitudeOrAddress: string | number, opt_longitude?: number, opt_radius?: number): PubAdsService;
        setPublisherProvidedId(ppid: string): PubAdsService;
        setSafeFrameConfig(config: SafeFrameConfig): PubAdsService;
        setTagForChildDirectedTreatment(value: number): PubAdsService;
        setTargeting(key: string, value: string | string[]): PubAdsService;
        setVideoContent(videoContentId: string, videoCmsId: string): void;
        updateCorrelator(): PubAdsService;
    }

    interface SizeMappingBuilder {
        addSize(viewportSize: SingleSizeArray, slotSize: GeneralSize): SizeMappingBuilder;
        build(): SizeMappingArray;
    }

    namespace events {
        interface ImpressionViewableEvent {
            serviceName: string;
            slot: Slot;
        }

        interface SlotOnloadEvent {
            serviceName: string;
            slot: Slot;
        }

        interface BaseSlotRenderEndedEvent {
            serviceName: string;
            slot: Slot;
        }

        interface EmptySlotRenderEndedEvent extends BaseSlotRenderEndedEvent {
            creativeId: undefined;
            isEmpty: true;
            lineItemId: undefined;
            size: undefined;
        }

        interface FilledSlotRenderEndedEvent extends BaseSlotRenderEndedEvent {
            creativeId: number;
            isEmpty: false;
            lineItemId: number;
            size: SingleSizeArray;
        }

        type SlotRenderEndedEvent = EmptySlotRenderEndedEvent | FilledSlotRenderEndedEvent;

        interface slotVisibilityChangedEvent {
            inViewPercentage: number;
            serviceName: string;
            slot: Slot;
        }

        interface EventNameMap {
            impressionViewable: events.ImpressionViewableEvent,
            slotOnload: events.SlotOnloadEvent,
            slotRenderEnded: events.SlotRenderEndedEvent,
            slotVisibilityChanged: events.slotVisibilityChangedEvent,
        }
    }
}

declare let googletag: googletag.Googletag;
