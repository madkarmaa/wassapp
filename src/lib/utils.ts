type ObservableElement = ParentNode & Node;

export const waitForElement = <T extends Element>(
    observeTarget: ObservableElement,
    selector: string
) =>
    new Promise<T>((resolve) => {
        const observer = new MutationObserver(() => {
            const result = observeTarget.querySelector(selector.trim());
            if (!result) return;

            observer.disconnect();
            resolve(result as T);
        });

        observer.observe(observeTarget, { childList: true, subtree: true });
    });
