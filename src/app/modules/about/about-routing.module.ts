import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App
import { AboutComponent } from './components';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', pathMatch: 'full', component: AboutComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutRoutingModule {
    //
}
